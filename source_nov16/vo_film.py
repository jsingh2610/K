"""python3 vo_story.py <name>  -> public/katha/<name>_vo.wav + src/videos/katha/<name>.json, then the calm series mix."""
import numpy as np,soundfile as sf,json,subprocess,sys,re
from scipy.ndimage import uniform_filter1d
from kokoro_onnx import Kokoro
name=sys.argv[1];S=json.load(open(f'katha_scripts/{name}.json'))
k=Kokoro('/home/claude/tts/kokoro-v1.0.onnx','/home/claude/tts/voices-v1.0.bin')
g_=k.get_voice_style
V={'n':.6*g_('am_michael')+.4*g_('am_onyx'),'s':g_('am_onyx'),'d':g_('am_onyx'),'f':.7*g_('af_heart')+.3*g_('af_sarah')}
FX={'s':"asetrate=24000*0.93,aresample=24000,atempo=1.06,aecho=0.8:0.5:90|170:0.22|0.14",'d':"asetrate=24000*0.84,aresample=24000,atempo=1.12",'f':"aecho=0.8:0.4:60:0.12"}
FIX={'ʃˈiːvə':'ʃˈɪvə','ʃˈiːvɚ':'ʃˈɪvə','pɑːɹvˈɑːɾi':'pˈɑːɹvəti','kˈaɪlæʃ':'kaɪlˈɑːʃ','kaɪlˈæʃ':'kaɪlˈɑːʃ','sædhˈɑːnə':'sˈɑːdənɑː','sˈɑːdənə':'sˈɑːdənɑː'};FIX.update(S.get('fix',{}))
sr=24000;parts=[np.zeros(int(.12*sr))];t=.12;meta=[]
def say(w,txt,sp,gain,pitch):
    ph=k.tokenizer.phonemize(txt,'en-us')
    for a,b in FIX.items(): ph=ph.replace(a,b)
    print('  ',w,ph)
    x,_=k.create(ph,voice=V[w],speed=sp,lang='en-us',is_phonemes=True)
    j=np.where(np.abs(x)>.008)[0];x=x[max(0,j[0]-200):j[-1]+700]
    fx=[]
    if abs(pitch)>.01: r=2**(pitch/12);fx.append(f"asetrate=24000*{r:.5f},aresample=24000,atempo={1/r:.5f}")
    if w in FX: fx.append(FX[w])
    if fx:
        sf.write('/tmp/s.wav',x,sr);subprocess.run(f"ffmpeg -y -loglevel error -i /tmp/s.wav -af '{','.join(fx)}' /tmp/s2.wav",shell=True);x,_=sf.read('/tmp/s2.wav')
    rms=np.sqrt((x[np.abs(x)>.02]**2).mean());x=x*(.13/rms)*gain
    return np.clip(x,-.98,.98)
for w,segs in S['lines']:
    t0=t;ps=[]
    for txt,cap,sp,gain,pitch,pa in segs:
        sp=min(.95,max(.86,sp)) if w=='n' else sp; pitch=pitch*.5
        x=say(w,txt,sp,gain,pitch);ps.append({'t':round(t,3),'d':round(len(x)/sr,3),'text':cap or txt})
        parts+=[x,np.zeros(int(pa*sr))];t+=len(x)/sr+pa
    meta.append({'t':round(t0,3),'d':round(ps[-1]['t']+ps[-1]['d']-t0,3),'text':' '.join(p['text'] for p in ps),'who':w,'parts':ps})
v=np.concatenate(parts);dur=len(v)/sr
json.dump({'lines':meta,'dur':round(dur,3)},open(S.get('json',f'src/videos/katha/{name}.json'),'w'),indent=1)
# ---- series mix: drone, slow pad, the same bell at the start and on the end card
T=[m['t'] for m in meta];n=len(v)+int(1.4*sr);tt=np.arange(n)/sr;y=np.zeros(n);root=S.get('key',62);hz=lambda m:440*2**((m-69)/12)
def add(st,seg,g=1.0):
    a=int(st*sr)
    if 0<=a<n: seg=seg[:n-a];y[a:a+len(seg)]+=seg*g
for m,g in [(root-24,.5),(root-12,.45),(root-5,.3),(root,.22),(root+7,.08)]:
    f=hz(m);y+=g*.12*np.sin(2*np.pi*f*tt+np.sin(2*np.pi*.11*tt+f))*(.75+.25*np.sin(2*np.pi*.07*tt+f))
CH=[[0,3,7],[-4,0,3],[-2,2,5],[0,3,7]] if S.get('minor',True) else [[0,4,7],[5,9,12],[-5,-1,2],[0,4,7]]
sd=n/sr/6
for i in range(6):
    d=sd+1.5;s=np.arange(int(d*sr))/sr;e=np.clip(s/2.5,0,1)*np.clip((d-s)/2.5,0,1)
    add(i*sd,sum(np.sin(2*np.pi*hz(root+c)*s)+.5*np.sin(2*np.pi*hz(root+c)*1.004*s) for c in CH[i%4])*e,.022)
def bell(f,d=4.5):
    s=np.arange(int(d*sr))/sr;return sum(a*np.sin(2*np.pi*f*r*s)*np.exp(-s*kk) for r,a,kk in [(1,1,1.1),(2.0,.5,1.6),(2.76,.35,2.2),(5.4,.18,3.2)])*np.clip(s/.01,0,1)
add(.15,bell(440),.10);add(T[-1]-.05,bell(440,5),.13)
for li in S.get('bell',[]): add(T[li]-.1,bell(587.3),.1)
for li,off in S.get('swell',[]):
    d=3.2;s=np.arange(int(d*sr))/sr;e=np.sin(np.pi*s/d)**2;add(T[li]+off,(np.sin(2*np.pi*55*s)+.4*np.sin(2*np.pi*110*s))*e,.16)
    nz=uniform_filter1d(np.random.RandomState(1).randn(len(s)),40)*6;add(T[li]+off,nz*e*np.linspace(.2,1,len(s)),.03)
SC=[0,3,7,5,3,0] if S.get('minor',True) else [0,4,7,9,7,4]
for li,off in S.get('flute',[]):
    for i,c in enumerate(SC):
        f=hz(root+12+c);s=np.arange(int(1.4*sr))/sr;e=np.clip(s/.18,0,1)*np.clip((1.4-s)/.6,0,1)
        add(T[li]+off+i*.85,np.sin(2*np.pi*f*s+.9*np.sin(2*np.pi*5*s)*np.clip(s-.3,0,1))*e+.15*np.sin(2*np.pi*2*f*s)*e,.035)
PENT=[0,2,4,7,9]
for li,off,cnt,iv,st in S.get('pluck',[]):          # soft rising plucks: one per bead
    for b in range(cnt):
        k2=st+b;f=hz(root-12+12*(k2//5)+PENT[k2%5]);s=np.arange(int(1.6*sr))/sr
        add(T[li]+off+b*iv,(np.sin(2*np.pi*f*s)+.35*np.sin(2*np.pi*2*f*s)+.12*np.sin(2*np.pi*3*f*s))*np.exp(-s*3.2)*np.clip(s/.006,0,1),.05)
for li,off,bpm,beats in S.get('drum',[]):          # soft frame-drum pulse, never a hit
    ds=np.arange(int(.3*sr))/sr;th=np.sin(2*np.pi*(70+30*np.exp(-ds*30))*ds)*np.exp(-ds*14)
    for b in range(beats): add(T[li]+off+b*60/bpm,th,.09*(1 if b%2==0 else .6))
vv=np.pad(v,(0,n-len(v)));g=1-.5*np.clip(uniform_filter1d(np.abs(vv),int(.2*sr))/.04,0,1)
fade=np.clip(tt/1.0,0,1)*np.clip((n/sr-tt)/1.2,0,1)
sf.write('/tmp/km.wav',(y*g*fade)+vv,sr)
subprocess.run(f"ffmpeg -y -loglevel error -i /tmp/km.wav -af loudnorm=I=-14:TP=-1.5 -ar 48000 {S.get('wav',f'public/katha/{name}.wav')}",shell=True)
print(name,round(dur,2),'s')
