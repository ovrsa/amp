import { ref } from 'vue';
import axios, { AxiosError } from 'axios';
import { User } from '../types/interfaces';

export function useFetchUsers() {
  const users = ref<User[]>([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/v1/users');
      users.value = response.data;
    } catch (error) {
      const err = error as AxiosError;
      // requestと通信errorを分ける
      if (err.response) {
        if (err.response.status === 401) {
          window.alert('認証に失敗しました。');
        } else {
          window.alert('サーバーエラーが発生しました。');
        }
      } else {
        window.alert('ネットワークエラーが発生しました。');
      }
    }
  };

  return { users, fetchUsers };
}