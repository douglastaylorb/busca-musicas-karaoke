export async function getMusicList() {
    const response = await fetch('/musicas.json');
    const data = await response.json();
    
    return data;
  }