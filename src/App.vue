<script setup lang="ts">
import { reactive, ref, toRefs } from "vue";
import { postRequest, downloadRequest } from "./http/axios";

const formModel = reactive({
  returnType: "stream",
  screenUrl: "https://www.baidu.com",
  waitType: "timeout",
  timeout: "5000",
  selector: "",
  fileType: "img",
  extName:"png"
});
const loading = ref(false);
const imgShow = ref(false)
const waitOptions = ref([
  { value: "selector", label: "选择器" },
  // { value: "customVar", label: "自定义变量" },
  { value: "timeout", label: "等待时间" },
]);
const returnOptions = ref([
  { value: "ossFile", label: "oss存储" },
  { value: "stream", label: "二进制流" },
]);
const imgUrl = ref("");
const onSubmit = async () => {
  loading.value = true;
  const transformedData = toRefs(formModel);

  const result = {
    returnType: transformedData.returnType.value,
    pageParams: {
      pageUrl: transformedData.screenUrl.value,
      waitType: transformedData.waitType.value,
      selector: transformedData.selector.value,
      waitForSelectorTimeout: transformedData.timeout.value,
      outputOptions: {
        fileType: transformedData.fileType.value,
        extName: transformedData.extName.value
      },
    },
  };
  if(result.returnType === "ossFile"){
    let res = await postRequest(
      "http://127.0.0.1:5678/report/screenshot",
      result
    );
    imgUrl.value = res.Location;
  }else {
    await downloadRequest(
      "http://127.0.0.1:5678/report/screenshot",
      result
    )
  }
  imgShow.value = true
  loading.value = false;
};
</script>

<template>
  <div>
    <el-form :model="formModel" label-width="100">
      <el-form-item label="返回类型" prop="returnType">
        <el-select
          v-model="formModel.returnType"
          placeholder="请选择返回类型"
          clearable
          style="width: 200px"
        >
          <el-option
            v-for="item in returnOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="截屏地址" prop="screenUrl">
        <el-input
          v-model="formModel.screenUrl"
          placeholder="请输入想要截屏的地址"
          clearable
          style="width: 200px"
        ></el-input>
      </el-form-item>
      <el-form-item label="等待类型" prop="waitType">
        <el-select
          v-model="formModel.waitType"
          placeholder="请选择等待类型"
          clearable
          style="width: 200px"
        >
          <el-option
            v-for="item in waitOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="formModel.waitType === 'selector'"
        label="选择器"
        prop="selector"
      >
        <el-input
          v-model="formModel.selector"
          placeholder="请输入以什么选择器为目的来开始截屏"
          clearable
          style="width: 200px"
        >
        </el-input>
      </el-form-item>
      <el-form-item
        v-if="formModel.waitType === 'timeout'"
        label="等待时间"
        prop="timeout"
      >
        <el-input
          v-model="formModel.timeout"
          placeholder="请输入在无头浏览器打开页面后多少秒截屏"
          clearable
          style="width: 200px"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="返回文件后缀" prop="fileType">
        <el-input
          v-model="formModel.fileType"
          placeholder="请输入返回文件后缀"
          clearable
          style="width: 200px"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="后缀名" prop="extName">
        <el-input
          v-model="formModel.extName"
          placeholder="请输入后缀名"
          clearable
          style="width: 200px"
        >
        </el-input>
      </el-form-item>
      <el-form-item label-width="auto">
        <el-button type="default" :loading="loading" @click="onSubmit"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
    <el-image
      v-if="!imgShow && formModel.returnType === 'ossFile'"
      style="width: 100px; height: 100px"
      :zoom-rate="1.2"
      :max-scale="7"
      :min-scale="0.2"
      :initial-index="4"
      :src="imgUrl"
      :preview-src-list="[imgUrl]"
      fit="cover"
    />
  </div>
</template>

<style scoped></style>
