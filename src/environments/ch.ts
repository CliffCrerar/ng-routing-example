export class Challenge {
  private static _chUrl = 'https://gist.githubusercontent.com/CliffCrerar/d2df1b1d06e7c9ae36c7d1051dadadcc/raw/94e4d677f574c64677aec3637a35d68d1c4ed277/challenge.md';
  static fetchChallenge(): Promise<string> {
    return fetch(Challenge._chUrl)
      .then(response => response.text())
      .catch(error => error);
  }
}
