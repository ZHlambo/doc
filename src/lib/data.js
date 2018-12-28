module.exports = [{
  "name": "client",
  "data": [{
    "name": "cat",
    "path": "C:\\Users\\Administrator\\Desktop\\koa-project\\src\\mysql\\raml\\client\\cat.raml",
    "routes": [{
      "verb": "get",
      "uri": "/client/cat/root",
      "description": "获取第一级分类",
      "handlerFunc": "rootCat",
      "groupBy": "cat"
    }, {
      "verb": "get",
      "uri": "/client/cat/:id",
      "description": "获取分类的子集分类",
      "handlerFunc": "getCatChild",
      "groupBy": "cat"
    }, {
      "verb": "get",
      "uri": "/client/cat/:id/sku",
      "description": "获取分类下所有产品",
      "handlerFunc": "getCatSkus",
      "groupBy": "cat"
    }]
  }, {
    "name": "sku",
    "path": "C:\\Users\\Administrator\\Desktop\\koa-project\\src\\mysql\\raml\\client\\sku.raml",
    "routes": [{
      "verb": "get",
      "uri": "/client/skus",
      "description": "获取产品列表",
      "handlerFunc": "listSku",
      "groupBy": "sku"
    }, {
      "verb": "get",
      "uri": "/client/sku/:id/info",
      "description": "获取单个产品信息",
      "handlerFunc": "getSkuInfo",
      "groupBy": "sku"
    }]
  }, {
    "name": "user",
    "path": "C:\\Users\\Administrator\\Desktop\\koa-project\\src\\mysql\\raml\\client\\user.raml",
    "routes": [{
      "verb": "delete",
      "uri": "/client/user",
      "description": "注销用户",
      "handlerFunc": "deleteUser",
      "groupBy": "auth"
    }, {
      "verb": "get",
      "uri": "/client/user/info",
      "description": "获取用户信息",
      "handlerFunc": "getUserInfo",
      "groupBy": "auth"
    }, {
      "verb": "put",
      "uri": "/client/user/info",
      "description": "修改用户信息",
      "handlerFunc": "putUserInfo",
      "groupBy": "auth"
    }, {
      "verb": "post",
      "uri": "/client/user/login",
      "description": "用户登录",
      "handlerFunc": "userLogin",
      "groupBy": "user"
    }]
  }]
}, {
  "name": "manage",
  "data": [{
    "name": "cat",
    "path": "C:\\Users\\Administrator\\Desktop\\koa-project\\src\\mysql\\raml\\manage\\cat.raml",
    "routes": [{
      "verb": "post",
      "uri": "/manage/cat",
      "description": "创建分类",
      "handlerFunc": "createCat",
      "groupBy": "auth",
      "body": {
        "params": {
          "data": [
            {
              "name": "name",
              "type": "string",
              "desc": "分类名称",
              "must": true
            },
            {
              "name": "parentid",
              "type": "string",
              "desc": "父分类id",
              "must": false
            }
          ],
          "headers": [
            {
              "name": "ip",
              "type": "string",
              "desc": "电脑ip地址",
              "must": false
            }
          ]
        },
        "example": {
          "name": "catName"
        },
        "type": ["createCat"]
      }
    }, {
      "verb": "get",
      "uri": "/manage/cat/root",
      "description": "获取第一级分类",
      "handlerFunc": "rootCat",
      "groupBy": "cat"
    }, {
      "verb": "delete",
      "uri": "/manage/cat/:id",
      "description": "删除单个分类",
      "handlerFunc": "deleteCat",
      "groupBy": "auth"
    }, {
      "verb": "get",
      "uri": "/manage/cat/:id/child",
      "description": "获取分类的子集分类",
      "handlerFunc": "getCatChild",
      "groupBy": "cat"
    }, {
      "verb": "get",
      "uri": "/manage/cat/:id/info",
      "description": "获取单个分类信息",
      "handlerFunc": "getCatInfo",
      "groupBy": "cat"
    }, {
      "verb": "put",
      "uri": "/manage/cat/:id/info",
      "description": "修改单个分类信息",
      "handlerFunc": "putCatInfo",
      "groupBy": "auth"
    }, {
      "verb": "get",
      "uri": "/manage/cat/:id/sku",
      "description": "获取分类下所有产品",
      "handlerFunc": "getCatSkus",
      "groupBy": "cat"
    }]
  }, {
    "name": "sku",
    "path": "C:\\Users\\Administrator\\Desktop\\koa-project\\src\\mysql\\raml\\manage\\sku.raml",
    "routes": [{
      "verb": "get",
      "uri": "/manage/skus",
      "description": "获取产品列表",
      "handlerFunc": "listSku",
      "groupBy": "sku"
    }, {
      "verb": "post",
      "uri": "/manage/sku",
      "description": "创建单个产品",
      "handlerFunc": "createSku",
      "groupBy": "auth"
    }, {
      "verb": "delete",
      "uri": "/manage/sku/:id",
      "description": "删除单个产品",
      "handlerFunc": "deleteSku",
      "groupBy": "auth"
    }, {
      "verb": "get",
      "uri": "/manage/sku/:id/info",
      "description": "获取单个产品信息",
      "handlerFunc": "getSkuInfo",
      "groupBy": "auth"
    }, {
      "verb": "put",
      "uri": "/manage/sku/:id/info",
      "description": "修改单个产品信息",
      "handlerFunc": "putSkuInfo",
      "groupBy": "auth"
    }]
  }, {
    "name": "staff",
    "path": "C:\\Users\\Administrator\\Desktop\\koa-project\\src\\mysql\\raml\\manage\\staff.raml",
    "routes": [{
      "verb": "post",
      "uri": "/manage/staff/login",
      "description": "员工登录",
      "handlerFunc": "staffLogin",
      "groupBy": "staff"
    }]
  }, {
    "name": "user",
    "path": "C:\\Users\\Administrator\\Desktop\\koa-project\\src\\mysql\\raml\\manage\\user.raml",
    "routes": [{
      "verb": "get",
      "uri": "/manage/users",
      "description": "获取用户列表",
      "handlerFunc": "listUser",
      "groupBy": "auth"
    }, {
      "verb": "post",
      "uri": "/manage/user",
      "description": "创建单个用户",
      "handlerFunc": "createUser",
      "groupBy": "auth"
    }, {
      "verb": "delete",
      "uri": "/manage/user/:id",
      "description": "删除单个用户",
      "handlerFunc": "deleteUser",
      "groupBy": "auth"
    }, {
      "verb": "get",
      "uri": "/manage/user/:id/info",
      "description": "获取单个用户信息",
      "handlerFunc": "getUserInfo",
      "groupBy": "auth"
    }, {
      "verb": "put",
      "uri": "/manage/user/:id/info",
      "description": "修改单个用户信息",
      "handlerFunc": "putUserInfo",
      "groupBy": "auth"
    }]
  }]
}];
