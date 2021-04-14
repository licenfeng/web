<template>
  <input
    type="button"
    id="authentication-code"
    v-model="authenticationCode"
    @click="createCode"
  />
</template>

<script>
export default {
  data() {
    return {
      authenticationCode: ''
    }
  },
  props: {
    // 可以传入任意长度
    codeLength: {
      type: Number,
      default: 4
    }
  },
  methods: {
    createCode() {
      let code = ''
      var random = new Array(
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z'
      )

      for (var i = 0; i < this.codeLength; i++) {
        var index = Math.floor(Math.random() * random.length)
        code += random[index]
      }
      this.authenticationCode = code
    },
    validateCode(userVal) {
      return new Promise((resolve, reject) => {
        if (userVal.toUpperCase() === this.authenticationCode.toUpperCase()) {
          resolve('success')
        } else {
          this.createCode()
          reject('error')
        }
      })
    }
  },
  mounted() {
    this.createCode()
  }
}
</script>

<style lang="less" scoped>
#authentication-code {
  font-size: 18px;
  letter-spacing: 5px;
  color: #053d84;
  width: 80px;
  background: #f2f2f5;
  outline: none;
  border: 0;
}
</style>
