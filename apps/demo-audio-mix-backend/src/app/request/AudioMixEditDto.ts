export enum AudioMixEffect {
  'forest' = 'forest',
  'rain' = 'rain',
  'sea' = 'sea',
  'fire' = 'fire',
}

export enum EffectVersion {
  '01' = '01',
  '02' = '02',
  '03' = '03',
}

export class AudioMixEditDto {
  readonly effect: AudioMixEffect;
  readonly version: EffectVersion;
}
