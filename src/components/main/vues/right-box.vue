<template>
  <div class="right-box">
    <div class="main-box" id="main-box">
      <div id="all">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import Bus from '@/eventBus.js'
export default {
  data() {
    return {
      editableTabs:[],
      editableTabsValue:"",
    }
  },
  created() {
    Bus.$on('addTab', s => {
      if (JSON.stringify(this.editableTabs).indexOf(JSON.stringify(s)) < 0) {
        this.editableTabs.push(s)
      }
      this.editableTabsValue = s.label
      sessionStorage.setItem('editableTabs', JSON.stringify(this.editableTabs))
      sessionStorage.setItem('editableTabsValue', s.label)
    })
  },
  mounted() {
    if (sessionStorage.getItem('editableTabs')) {
      this.editableTabs = JSON.parse(sessionStorage.getItem('editableTabs'))
    }
    if (sessionStorage.getItem('editableTabsValue')) {
      this.editableTabsValue = sessionStorage.getItem('editableTabsValue')
    }
  },
  watch: {
    editableTabsValue() {
      this.getSetRouter()
    }
  },
  methods: {
    getSetRouter() {
      let currentPath = this.editableTabs.find(item => {
        return item.label == this.editableTabsValue
      })
      this.$router.push('/' + currentPath.path)
      Bus.$emit('toggleActivePath', currentPath.path)
    },
    removeTab(targetName) {
      let tabs = this.editableTabs
      let activeName = this.editableTabsValue
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.label === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.label
              this.$router.push('/' + nextTab.path)
            }
          }
        })
      }
      this.editableTabsValue = activeName
      this.editableTabs = tabs.filter(tab => tab.label !== targetName)
      sessionStorage.setItem('editableTabs', JSON.stringify(this.editableTabs))
      sessionStorage.setItem('editableTabsValue', this.editableTabsValue)
    },
    toggleTab(tab) {
      this.editableTabsValue = tab.label
      sessionStorage.setItem('editableTabsValue', this.editableTabsValue)
    },
    closeOther() {
      let self = this
      let currentEditableTab = {}
      for (let i = 0; i < self.editableTabs.length; i++) {
        if (self.editableTabs[i].label == self.editableTabsValue) {
          currentEditableTab = self.editableTabs[i]
          break
        }
      }
      self.editableTabs = []
      self.editableTabs.push(currentEditableTab)
      sessionStorage.setItem('editableTabs', JSON.stringify(self.editableTabs))
      // this.setrouter()
    },
    closeAll() {
      this.editableTabs = [
        {
          id: '1-1-1',
          label: '三级菜单1-1-1',
          path: 'page1'
        }
      ]
      this.editableTabsValue = '三级菜单1-1-1'
      this.$router.push({
        path: this.editableTabs[0].path
      })
      sessionStorage.setItem('editableTabs', JSON.stringify(this.editableTabs))
      sessionStorage.setItem('editableTabsValue', this.editableTabsValue)
      // this.setrouter()
    }
  }
}
</script>
<style lang="less" scoped>

    #main-box{
      position: absolute;
      top: 50px;
      bottom: 0;
      width:100%;
      background: #f1f4f5;
      padding:20px;
      overflow-y: auto;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
    }
    #all{
      width: 100%;
      background: #fff;
      border-radius: 5px;
      padding: 15px 8px;
      min-height: 90%;
      height: auto;
      }

.right-box-tab{
	width:100%;
	height:50px;
	background:#fff;
}

</style>
<style>
	.el-tabs__nav{
		z-index: 0!important;
	}
	.el-tabs__nav .el-tabs__item:nth-child(1) span{
		display: none;
	}
	.el-tabs__nav-wrap {
		overflow: hidden;
		margin-bottom: -1px;
		position: relative;
	}
	.dropBtn {
		display: inline-block;
		position: relative;
		color: #606266;
		font-size: 14px;
		float: right;
		z-index:999;
	}
</style>