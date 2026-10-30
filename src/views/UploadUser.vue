<template>
  <a-upload
    v-model:file-list="fileList"
    name="file"
    action="/api/uploadFile"
    :headers="headers"
    @change="handleChange"
  >
    <a-button>
      <upload-outlined></upload-outlined>
      文件上传
    </a-button>
  </a-upload>
  <br>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import { UploadOutlined } from '@ant-design/icons-vue';
import type { UploadChangeParam } from 'ant-design-vue';

const handleChange = (info: UploadChangeParam) => {
  if (info.file.status !== 'uploading') {
    console.log(info.file, info.fileList);
  }
  if (info.file.status === 'done') {
    message.success(`${info.file.name} file uploaded successfully`);
  } else if (info.file.status === 'error') {
    message.error(`${info.file.name} file upload failed.`);
  }
};

const fileList = ref([]);
const headers = {
  authorization: 'authorization-text',
};
</script>

