<template>
  <div>
    <!-- <div>
      <el-button size="small" @click="addTab(editableTabsValue)">add tab</el-button>
    </div> -->
    <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" class="tabtitle">
      <el-tab-pane
        v-for="(item) in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "TopTab",
  props: {
     
    },
   setup(props,{ emit }) {
     let editableTabsValue=ref('2')
     let editableTabs=ref([{
          title: 'Tab 1',
          name: '1',
          content: 'Tab 1 content'
        }, {
          title: 'Tab 2',
          name: '2',
          content: 'Tab 2 content'
        }])
        let tabIndex=ref(2)
      function addTab(targetName) {
        let newTabName = ++tabIndex.value + '';
        editableTabs.value.push({
          title: 'New Tab',
          name: newTabName,
          content: 'New Tab content'
        });
        editableTabsValue.value = newTabName;
      }
      function removeTab(targetName) {
        let tabs = editableTabs.value;
        let activeName = editableTabsValue.value;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        editableTabsValue.value = activeName;
        editableTabs.value = tabs.filter(tab => tab.name !== targetName);
      }
    return {
      editableTabsValue,
        editableTabs,
        tabIndex,
        addTab,
        removeTab
    }
  }
};
</script>


<style scoped lang="less">
.el-tabs__header{
  margin: 0
}
</style>
