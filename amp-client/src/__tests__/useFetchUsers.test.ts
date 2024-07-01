/// <reference types="vitest" />
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import axios from 'axios';
import { defineComponent } from 'vue';
import { useFetchUsers } from '../hooks/useFetchUsers';
import type { Mocked } from 'vitest';

// Mock axios
vi.mock('axios');

describe('useFetchUsers', () => {
  let mockedAxios: Mocked<typeof axios>;

  // Reset mocks before each test
  beforeEach(() => {
    vi.resetAllMocks();
    vi.spyOn(window, 'alert').mockImplementation(() => {});
    mockedAxios = axios as Mocked<typeof axios>;
  });

  // Verify fetchUsers method works correctly
  it('fetches and sets users correctly', async () => {
    const mockData = [
      {
        id: 1,
        username: 'user1',
        email: 'user1@example.com',
        userIcon: 'url_to_icon1',
        categories: [
          {
            id: 1,
            name: 'Category1',
            items: [
              { id: 1, name: 'Item1' },
              { id: 2, name: 'Item2' },
            ],
          },
          {
            id: 2,
            name: 'Category2',
            items: [
              { id: 3, name: 'Item3' },
              { id: 4, name: 'Item4' },
            ],
          },
        ],
      },
    ];

    mockedAxios.get.mockResolvedValue({ data: mockData });

    const TestComponent = defineComponent({
      template: '<div></div>',
      setup() {
        const { users, fetchUsers } = useFetchUsers();
        return { users, fetchUsers };
      },
    });

    const wrapper = mount(TestComponent);
    await wrapper.vm.fetchUsers();
    await flushPromises();

    expect(wrapper.vm.users).toEqual(mockData);
  });

  // Test for authentication error
  it('handles authentication error', async () => {
    const errorMessage = 'データ取得時の認証に失敗しました。';

    mockedAxios.get.mockRejectedValue({
      response: {
        status: 401,
        data: { error: 'Unauthorized', message: errorMessage },
      },
    });

    const TestComponent = defineComponent({
      template: '<div></div>',
      setup() {
        const { users, fetchUsers } = useFetchUsers();
        return { users, fetchUsers };
      },
    });

    const wrapper = mount(TestComponent);
    await wrapper.vm.fetchUsers();
    await flushPromises();

    expect(window.alert).toHaveBeenCalledWith('認証に失敗しました。');
    expect(wrapper.vm.users).toEqual([]);
  });

  // Test for server error
  it('handles server error', async () => {
    const errorMessage = 'サーバーエラーが発生しました。';

    mockedAxios.get.mockRejectedValue({
      response: {
        status: 500,
        data: { error: 'Internal server error', message: errorMessage },
      },
    });

    const TestComponent = defineComponent({
      template: '<div></div>',
      setup() {
        const { users, fetchUsers } = useFetchUsers();
        return { users, fetchUsers };
      },
    });

    const wrapper = mount(TestComponent);
    await wrapper.vm.fetchUsers();
    await flushPromises();

    expect(window.alert).toHaveBeenCalledWith('サーバーエラーが発生しました。');
    expect(wrapper.vm.users).toEqual([]);
  });
});