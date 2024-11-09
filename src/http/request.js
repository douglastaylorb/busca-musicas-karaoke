export async function getMusicList() {
    const response = await fetch('https://gist.githubusercontent.com/douglastaylorb/88529797db016a39883c80e19b1307da/raw/b9e6e1f047d0c09c97123ec92a693c8e3965ded6/gistfile1.txt');
    const data = await response.json();
    
    return data;
  }