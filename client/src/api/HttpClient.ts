class HttpClient {
  async get(url: string) {
    const res = await this.#fetch(url);

    try {
      const data = await res?.json();
      return data;
    } catch (e) {
      if (!(e instanceof Error)) return
      console.error(`GET 요청 결과를 JSON 파싱하는 중 에러 발생 ${e.message}`);
    }
  }

  async post(url: string, body: unknown = null, headers: Record<string, string> = {}) {
    const res = await this.#fetch(url, {
      method: 'POST',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : null,
    });

    return res?.json();
  }

  async postAsForm(url: string, body: Record<string, string | Blob>) {
    const formData = new FormData();


    for (const key of Object.keys(body)) {
      formData.append(key, body[key]);
    }
    await this.#fetch(url, { method: 'POST', body: formData });
  }

  async delete(url: string) {
    const res = await this.#fetch(url, { method: 'DELETE' });
    return res;
  }

  async #fetch(url: string, option = {}) {
    try {
      const res = await fetch(url, option);
      if (!res.ok) {
        console.error(`HTTP 요청 실패: ${res.status} ${res.statusText}`);
        throw new Error(`HTTP 요청 실패: ${res.status}`);
      }
      return res;
    } catch (e) {
      if (!(e instanceof Error)) return;
      console.error(`네트워크 요청 중 에러 발생 ${e.message}`);
    }
  }
}

// const handleSubmit = async (selectedFile) => {
//   const formData = new FormData();
//   formData.append('file', selectedFile); // 선택된 파일 추가

//   try {
//     const response = await fetch(apiUrl + '/upload', {
//       method: 'POST',
//       body: formData,
//     });

//     if (response.ok) {
//       fetchFiles(); // 파일 목록 다시 불러오기 (업로드 후)
//     } else {
//       alert('파일 업로드에 실패했습니다.');
//     }
//   } catch (error) {
//     alert('파일 업로드 중 오류가 발생했습니다.');
//   }
// };

const client = new HttpClient();
export default client;
