import { Howl } from 'howler'
import snowSrc from '@/assets/snow.mp3'
import rainSrc from '@/assets/rain-thunder.mp3'
import lofiSrc from '@/assets/sunshine.mp3'

// Created ONCE at module load — never recreated
let snowHowl: Howl | null = null
let rainHowl: Howl | null = null
let lofiHowl: Howl | null = null
let _enabled = false
let _current: 'snow' | 'rain' | 'lofi' | null = null

// Initialize state from localStorage if possible
if (typeof window !== "undefined") {
  _enabled = localStorage.getItem("ambient_enabled") === "true";
}

function getSnow() {
  if (!snowHowl) snowHowl = new Howl({
    src: [snowSrc],
    loop: true, volume: 0.35, html5: true
  })
  return snowHowl
}

function getRain() {
  if (!rainHowl) rainHowl = new Howl({
    src: [rainSrc],
    loop: true, volume: 0.35, html5: true
  })
  return rainHowl
}

function getLofi() {
  if (!lofiHowl) lofiHowl = new Howl({
    src: [lofiSrc],
    loop: true, volume: 0.35, html5: true
  })
  return lofiHowl
}

function stopAll() {
  snowHowl?.stop()
  rainHowl?.stop()
  lofiHowl?.stop()
}

export type TrackName = 'snow' | 'rain' | 'lofi'

export function getTrackForContext(theme: string, atmosphere: string): TrackName {
  if (theme === 'winter-ivory') return 'lofi'
  if (atmosphere === 'rain') return 'rain'
  return 'snow'
}

export function switchTrack(track: TrackName) {
  if (!_enabled) return
  if (_current === track) return
  
  console.log(`[Audio] Switching to track: ${track}`);
  stopAll()
  _current = track
  if (track === 'snow') getSnow().play()
  if (track === 'rain') getRain().play()
  if (track === 'lofi') getLofi().play()
}

export function toggleSound(enabled: boolean, track: TrackName) {
  console.log(`[Audio] Setting enabled: ${enabled}, Target track: ${track}`);
  _enabled = enabled
  if (typeof window !== "undefined") {
    localStorage.setItem("ambient_enabled", enabled.toString());
  }

  stopAll()
  if (enabled) {
    _current = track
    if (track === 'snow') getSnow().play()
    if (track === 'rain') getRain().play()
    if (track === 'lofi') getLofi().play()
  } else {
    _current = null
  }
}

export function isEnabled() { return _enabled }
