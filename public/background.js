// background.js - Service Worker
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ sound: 'rain', isPlaying: false });
  });
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'toggleSound') {
      chrome.storage.local.get(['isPlaying'], (data) => {
        const newPlayingState = !data.isPlaying;
        chrome.storage.local.set({ isPlaying: newPlayingState });
        sendResponse({ isPlaying: newPlayingState });
      });
      return true; // Keep the message channel open
    }
  
    if (message.action === 'setSound') {
      chrome.storage.local.set({ sound: message.sound });
    }
  
    if (message.action === 'getSettings') {
      chrome.storage.local.get(['sound', 'isPlaying'], (data) => {
        sendResponse(data);
      });
      return true;
    }
  });
  