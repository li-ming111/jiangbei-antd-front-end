<template>
  <a-form
    :model="formState"
    name="basic"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      label="姓名"
      name="username"
      :rules="[{ required: true, message: '请添加姓名!' }]"
    >
      <a-input v-model:value="formState.username" />
    </a-form-item>

    <a-form-item
      label="性别"
      name="sex">
      <a-select
        ref="select"
        v-model:value="formState.sex"
        style="width: 120px"
        >
        <a-select-option value="boy">boy</a-select-option>
        <a-select-option value="girl">girl</a-select-option>
        </a-select>
    </a-form-item>
    <a-form-item
      label="年龄"
      name="age">
      <a-input-number v-model:value="formState.age" />
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" @click="saveOrUpdate">
        {{formState?.id?'修改':'保存'}}
      </a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
import axios from 'axios';
import { onMounted, reactive } from 'vue';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';

interface FormState {
  username: string;
  sex: string;
  age: number;
  flag?:string;
  id?:number;
}

const formState = reactive<FormState>({
  username: '',
  sex: 'boy',
  age: 1,
  flag:'add'
});

//获取路由参数
let user = history.state.tuser
onMounted(()=>{
  if(user){
    const Tuser = JSON.parse(user)//将字符串转换为对象
    Object.assign(formState,Tuser)
    console.log('----------->>',formState);
  }
})

const router = useRouter();

//保存
const save = () => {
  axios.post('/api/save.do',formState).then(()=>{
    message.success('保存成功');
    router.push('/showUser');
  })
};
//修改
const update = () => {
  formState.flag = 'update'
  axios.post('/api/update.do',formState).then(()=>{
    message.success('修改成功');
    router.push('/showUser');
  })
};

const saveOrUpdate = () => {
  if(formState.id){
   update()
  }else{
     save()
  }
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
</script>

