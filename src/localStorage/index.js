import localStorage from 'local-storage';

function getDataPath(draftId, dataName) {
  return `${draftId}/${dataName}`;
}

function getSortPreferences(draftId) {
  
  const dataPath = getDataPath(draftId, 'playerTableSorts');
  return JSON.parse(localStorage.get(dataPath) || '[]');
    
}

function updateSortPreference(draftId, newData) {
  
  const currentData = getSortPreferences(draftId);
  const dataPath = getDataPath(draftId, 'playerTableSorts');
  
  localStorage.set(dataPath, JSON.stringify(newData));

  return newData;
    
}

export default {getSortPreferences, updateSortPreference};