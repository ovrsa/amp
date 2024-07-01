<template>
  <div>
    <div class="text-sm text-gray-600 grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 md:px-16 lg:px-32">
      <div v-for="user in users" :key="user.id" class="pt-2 flex border-t border-gray-300 min-h-[250px]">
        <div class="w-1/3 p-4">
          <img :src="user.userIcon" alt="User Photo" class="w-40 h-40">
          <p class="mt-2 font-bold">{{ user.userName }}</p>
        </div>
        <div class="w-2/3 pl-20">
          <div v-for="userCategory in user.user_categories" :key="userCategory.id" class="mt-1">
            <div class="p-3 rounded-lg">
              <p>{{ userCategory.category.categoryName }}</p>
              <div>
                <div v-for="userItem in userCategory.user_items" :key="userItem.id" class="px-2 pt-1 rounded-lg">
                  {{ userItem.item.itemName }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useFetchUsers } from '../hooks/useFetchUsers';
import { User } from '../types/interfaces';

const { users, fetchUsers } = useFetchUsers();

onMounted(() => {
  fetchUsers();
});
</script>

<style>
</style>