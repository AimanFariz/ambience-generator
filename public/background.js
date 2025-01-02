// background.js - Service Worker

// When the extension is installed or updated, set default sound preferences
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ sound: 'rain', isPlaying: false });
  });
  
  // Listen for messages from content script (popup or page) and handle them
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Handle "toggleSound" action to play or pause the sound
    if (message.action === 'toggleSound') {
      chrome.storage.local.get(['isPlaying'], (data) => {
        const newPlayingState = !data.isPlaying;
        chrome.storage.local.set({ isPlaying: newPlayingState });
  
        // Send response to content script (page) with updated state
        sendResponse({ isPlaying: newPlayingState });
      });
      return true; // Keep the message channel open
    }
  
    // Handle setting a new sound preference
    if (message.action === 'setSound') {
      chrome.storage.local.set({ sound: message.sound });
    }
  
    // Handle getting current preferences (e.g., sound and play state)
    if (message.action === 'getSettings') {
      chrome.storage.local.get(['sound', 'isPlaying'], (data) => {
        sendResponse(data);
      });
      return true; // Keep the message channel open for async response
    }
  });
  