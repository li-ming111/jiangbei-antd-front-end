<template>
  <a-table bordered :data-source="dataSource" :columns="columns"
  :pagination="pagination" @change="onChange">
    <template #bodyCell="{ column, text, record }">      
      <template v-if="column.dataIndex === 'operation'">
        <a-space>
          <a-button type="primary"  @click="edit(record)">编辑</a-button>
          <a-popconfirm
            v-if="dataSource.length"
            title="是否删除?"
            cancelText="取消"
            okText="确定"
            @confirm="onDelete(record.id)">
            <a-button type="primary" danger>删除</a-button>
          </a-popconfirm>
        </a-space>
      </template>
    </template>
  </a-table>
</template>
<script lang="ts" setup>
import axios from 'axios';
import {  onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';

interface DataItem {
  id: number;
  username: string;
  sex: string;
  age: number;
}

const columns = [
  {
    title: '姓名',
    dataIndex: 'username',
    width: '30%',
  },
  {
    title: '性别',
    dataIndex: 'sex',
  },
  {
    title: '年龄',
    dataIndex: 'age',
  },
  {
    title: '操作',
    dataIndex: 'operation',
  },
];
//数据源
const dataSource: Ref<DataItem[]> = ref([]);
//显示
const show=()=>{
    axios.post('/api/show.do',
    {page1:pagination.value.current,size1:pagination.value.pageSize}).then(res=>{
        console.log(res);
        dataSource.value=res.data.list;
        pagination.value.total=res.data.totalCount;
    })
}
//页面加载后调用显示
onMounted(()=>{
    show();
})

const router = useRouter();

const edit = (record:DataItem) => {
   router.push({
     path:'/addUser',
     state:{
        tuser:JSON.stringify(record)
     }
   })
};

const onDelete = (id:number) => {
  axios.post('/api/delete.do',{id:id,flag:'delete'}).then(res=>{
    message.success('删除成功');
    show();
  })
};
//----------分页-------------   
const pagination = ref({
	total:0,
	current:1,
	pageSize:3,
	showr:true,
	pageSizeOptions:['3','10','15'],
	showQuickJumper:true,
	showSizeChanger:true,
	onShowSizeChange:pageSizeChange,
	onChange:pageChange,
 })

 //页码变化
 function pageSizeChange(current:number,pageSize:number){
	pagination.value.current = current
	pagination.value.pageSize = pageSize
 }
 //点击下一页
 function pageChange(page:number, pageSize:number){
   pagination.value.current = page
   pagination.value.pageSize = pageSize
 }

 //当前页码变化
 const onChange = (pag:any) => {	
   pagination.value.current = pag.current
   pagination.value.pageSize = pag.pageSize
   show()
};

</script>
<style lang="less" scoped>
.editable-cell {
  position: relative;
  .editable-cell-input-wrapper,
  .editable-cell-text-wrapper {
    padding-right: 24px;
  }

  .editable-cell-text-wrapper {
    padding: 5px 24px 5px 5px;
  }

  .editable-cell-icon,
  .editable-cell-icon-check {
    position: absolute;
    right: 0;
    width: 20px;
    cursor: pointer;
  }

  .editable-cell-icon {
    margin-top: 4px;
    display: none;
  }

  .editable-cell-icon-check {
    line-height: 28px;
  }

  .editable-cell-icon:hover,
  .editable-cell-icon-check:hover {
    color: #108ee9;
  }

  .editable-add-btn {
    margin-bottom: 8px;
  }
}
.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}
</style>
