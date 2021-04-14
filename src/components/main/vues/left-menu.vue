<template>
  <div class="aside" :style="{ width: isCollapse ? '64px' : '200px' }">
    <el-menu
      :default-active="activePath"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      :collapse="isCollapse"
      :unique-opened="true"
      :router="true"
    >
      <div style="color: #fff; text-align: center;" @click="toggleCollapse">
        <i class="iconfont-menu"></i>
      </div>
      <!-- 一级菜单 -->
      <el-submenu class="theAsideMenu" v-for="item1 in menuList" :key="item1.id" :index="item1.id">
        <template slot="title">
          <i :class="item1.icon"></i>
          <span>{{ item1.label }}</span>
        </template>
        <!-- 二级菜单 -->
        <div v-for="item2 in item1.children" :key="item2.id+'c'">
          <el-submenu v-if="item2.children" :index="item2.id">
            <template slot="title">
                <div  @click="addTab(item2)">{{ item2.label }}</div>
            </template>
            <!-- 三级菜单 -->
            <el-menu-item
              v-for="item3 in item2.children"
              :key="item3.id"
              :index="item3.path"
              @click="addTab(item3)">{{ item3.label }}
            </el-menu-item>
          </el-submenu>
        </div>
        <div v-for="item3 in item1.children" :key="item3.id">
          <el-menu-item
               v-if="!item3.children" 
              :index="item3.path"
              @click="addTab(item3)">{{ item3.label }}
          </el-menu-item>
        </div>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import Bus from '@/eventBus.js'
export default {
  data() {
    return {
      // 侧边栏菜单模拟数据
      isCollapse: false,
      activePath: 'breTreatyInfo',
      menuList: [
        {
          id: '1',
          label: '合约业务',
          icon: 'el-icon-location',
          children: [
            {
              id: '1-1',
              label: 'Treaty基本信息',
              children: [

                {
                  id: '1-1-1',
                  label: '合约业务查询',
                  path: 'breTreatyInfo'
                },
                {
                  id: '1-1-2',
                  label: '新增比例合约',
                  path: 'addTreatyInfo'
                },
                {
                  id:'1-1-5',
                  label:"新增非比例合约",
                  path:'editContract'
                },
              ]
            },
            {
              id: '1-2',
              label: 'Treaty SOA',
            }
          ]
        },
        {
          id: '2',
          label: '组织机构',
          icon: 'el-icon-location',
          children: [
            {
              id: '2-1',
              label: '机构信息详情',
              path:'breCustomerCompanyIndex'
            }]

        },
        {
          id: '3',
          label: '业务管理',
          icon: 'el-icon-location',
          children: [
            {
              id: '3-1',
              label: '类型配置',
              path:'breWordbookInfoIndex',
            },
            {
              id: '3-2',
              label: '币种',
              path:'breCountry',
            },
            {
              id: '3-3',
              label: '国家',
              path:'breCountryRegionIndex',
            },
            {
              id: '3-4',
              label: '导出选择字段',
              path: 'breFieldInfo',
            }
          ]
        }
      ]
    }
  },
  created() {
    window.sessionStorage.setItem('activePath', this.activePath)
  },
  mounted() {
    if (sessionStorage.getItem('editableTabs')) {
      this.editableTabs = JSON.parse(sessionStorage.getItem('editableTabs'))
    }
    Bus.$on('toggleActivePath', currentPath => {
      this.activePath = currentPath
    })
  },
  methods: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    addTab(pointPath) {
      if(pointPath.path == null){
         return ;
      }
      Bus.$emit('addTab', pointPath)
    },

  }
}
</script>

<style lang="less" scoped>
.aside {
  background-color: rgb(84, 92, 100);
  height: 100%;
  position: relative;
  box-sizing: border-box;
  .el-menu {
    border-right: 0 !important;
    .el-menu-item {
      min-width: 0px;
    }
  }
}
</style>
