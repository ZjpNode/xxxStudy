var W_SYS_API = window.W_SYS_API || {};
(function ($, window, document) {

    //引用外部通用js
    var appCommon = $.C_getCommon("appCommon");
    var commonUtils = $.C_getCommon("commonUtils");
    var commonValidation = $.C_getCommon("commonValidation");
    //引用外部组件JS
    var leftMenu = window.W_SYS_API["leftMenu"];
    var tplInit = window.W_SYS_API["tplInit"];
    var fileUpload = window.W_SYS_API["fileUpload"];
    //接口地址
    var tplOperationActionUrl = sysConfigData.configData["Tpl"].actionUrl;
    var referralTreatmentActionUrl = sysConfigData.configData["referralTreatment"].actionUrl;//转诊处理
    //病历信息关联查询url
    var accessWinUrl = sysConfigData.configData["newWin"].accessWinUrl;
    var tplUrl = tplCode + tplOperationActionUrl.baseUrl;

    //模板操作地址
    var tplOperationUrl = {
        baseUrl_: "",
        select: "",
        save: "",
        del: "",
        update: ""
    };

    /**
     * 设置模板操作地址
     * @param param 某个模板的具体操作方法的接口地址
     * */
    function setTplOperationUrl(param) {
        tplOperationUrl = {
            select: proCode + param.baseUrl + param.selectUrl,
            save: proCode + param.baseUrl + param.saveUrl,
            del: proCode + param.baseUrl + param.delUrl,
            update: proCode + param.baseUrl + param.updateUrl,
            audit: proCode + param.baseUrl + param.auditUrl
        };
    }

    /**
     *  提交数据
     * @param option 操作（新增：save，修改：update）
     * */
    function submitData(option) {
        var param1 = $("#applicationForm").serializeArray();
        var param2 = $("#treatmentForm").serializeArray();
        var param = param1.concat(param2);
        var optionUrl = tplOperationUrl[option];
        appCommon.ajaxFunction(optionUrl, param, true, function (data) {
            if (data && data.success == true) {
                $.messager.alert("提示", "成功", "info");
                //保存成功后返回列表
                leftMenu.actMenuClick();
            } else {
                $.messager.alert("提示", data.mgs, "error");
            }
        });
        //alert("数据提交中..."+tplOperationUrl.saveUrl_);
    }

    /**
     *  保存表单：需验证姓名是否为空，且设置状态STATE为0（STATE为0即转诊申请时的保存）
     * @param option 操作（新增：save，修改：update）
     * */
    function saveForm(option) {
        var isValid = $('#PATIENT_NAME').validatebox("isValid");
        if (isValid) {
            $("#form_state").val(0);     //转诊处理时该STATE已经被disable，不会起作用
            fileUpload.uploadFile(option, submitData);
            //submitData(option);
        } else {
            $.messager.alert("提示", "姓名有误", "error");
        }
    }

    /**
     *  提交表单：需验证整个表单，且设置状态STATE为1（STATE为1即转诊申请时的提交）
     * @param option 操作（新增：save，修改：update）
     * */
    function submitForm(option) {
        var isValid = $('#applicationForm').form("validate") && $('#treatmentForm').form("validate");
        if (isValid) {
            $("#form_state").val(1);     //转诊处理时该STATE已经被disable，不会起作用
            fileUpload.uploadFile(option, submitData);
            //submitData(option);
        } else {
            $.messager.alert("提示", "表单数据有误", "error");
        }
    }

    /**
     * 通过转诊单
     */
    function allowForm() {
        //$("#form_state").val(2);     //转诊处理时该STATE已经被disable，不会起作用
        $("#form_state").removeAttr("disabled");
        var param = {
            "ID": $("#ID").val(),
            "STATE": "2",//已受理
            "ACCEPT_TIME": commonUtils.fomateDate("yyyy-MM-dd HH:mm:ss", new Date())
        };
        //console.log(tplOperationUrl);
        appCommon.ajaxFunction(tplOperationUrl["audit"], param, true, function (data) {
            if (data && data.success == true) {
                $.messager.alert("提示", "成功", "info");
                //保存成功后返回列表
                leftMenu.actMenuClick();
            } else {
                $.messager.alert("提示", data.mgs, "error");
            }
        });
    }

    /**
     * 不通过转诊单：需要验证不通过原因是否填写
     */
    function notAllowForm(option) {
        $("#form_state").removeAttr("disabled");
        var isValid = $('#remarks').validatebox("isValid");
        var param = {
            "ID": $("#ID").val(),
            "STATE": "-1",//未通过
            "ACCEPT_TIME": commonUtils.fomateDate("yyyy-MM-dd HH:mm:ss", new Date()),
            "remarks":$("#remarks").val()
        };
        //console.log(tplOperationUrl);
        appCommon.ajaxFunction(tplOperationUrl["audit"], param, true, function (data) {
            if (isValid&&data && data.success == true) {
                $.messager.alert("提示", "成功", "info");
                //保存成功后返回列表
                leftMenu.actMenuClick();
            } else {
                $.messager.alert("提示", "请填写转诊未通过原因", "error");
            }
        });
    }

    /**
     * 打开转诊单模板
     * @param REFERRAL_FORM_TYPE 转诊单类型
     * @param url 转诊单地址
     * @param name 转诊单名称
     * @param option 操作（新增：save，修改：update）
     **/
    function openTpl(REFERRAL_FORM_TYPE, url, name, option) {
        $("#navName").text(name);
        //加载模板
        leftMenu.navChangeContent(url, function () {
            var tplOptionAction = tplOperationActionUrl[REFERRAL_FORM_TYPE];
            //设置模板操作地址
            setTplOperationUrl(tplOptionAction);
            //模板事件绑定
            eventRes(option);
            //页面初始化
            initPage(option);
            fileUpload.init(option, submitData);
            tplInit.init();
        }, "", true);
    }

    /**
     * 打开弹出框
     * @param card_num 身份证
     */
    function openNewWind(card_num) {
        var token = W_SYS_API["token"].value;
        var orgCode = W_SYS_API["head"]["userMsg"]["ORG_CODE"];
        var url = "./newWin.html";
        $('#tpl_win').window({
            title: '病历信息关联查询',
            width: 1031,
            height: 721,
            closed: true,
            minimizable: false,
            maximizable: true,
            maximized: false,
            collapsible: false,
            resizable: true,
            cache: false,
            href: url,//$('#dlg').dialog('destroy', true);
            modal: true,
            /*onClose: function () {
             $(this).window("destroy");
             }*/
            onLoad: function () {
                document.getElementById("accessIframe").src = accessWinUrl + "?orgCode=" + orgCode + "&token=" + token + "&card_num=" + card_num;
            }
        });
        $('#tpl_win').show();
        $('#tpl_win').window('open');
    }

    /**
     * 关闭弹出框
     */
    function closeNewWind() {
        $('#tpl_win').close();
    }

    /**
     * 事件注册
     * @param option 操作（新增：save，修改：update）
     * */
    function eventRes(option) {
        //“保存”按钮事件
        commonUtils.eventBind("saveData", "click", function () {
            saveForm(option);
        });
        //“提交”按钮事件
        commonUtils.eventBind("submitData", "click", function () {
            submitForm(option);
        });
        //“通过”按钮事件
        commonUtils.eventBind("allowed", "click", function () {
            allowForm(option);
        });
        //“不通过”按钮事件
        commonUtils.eventBind("not_allowed", "click", function () {
            notAllowForm(option);
        });
        commonUtils.eventBind('newPrintData', 'click', function(){
            console.log(url.indexOf('&'));
            url = url.indexOf('?') > -1 ? url+'&' : url+'?';
            var printWindow = window.open(url+'isPrint=y','_blank','height=700,width=900,top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no');
            // console.log(printWindow)
            // printWindow.print();
            // printWindow.close();
          });
        //“打印”按钮事件
        commonUtils.eventBind("printData", "click", function () {
            //为了打印时能显示radio选中的选项
            $("input[type='radio']:checked").each(function (i, e) {
                $(e).attr("checked", "checked");
            });
            //为了打印时能显示input改变的值
            $("input").each(function (i, e) {
                $(e).attr("value", $(e).attr("value"));
            });
            //为了打印时能显示select改变的值
            $("select:not([class^='easyui-combobox'])").each(function (i, e) {
                var selVal = $(e).val();
                $(e).find("option").attr("selected", false);
                $(e).find("option[value='" + selVal + "']").attr("selected", true);
            });
            var printHthml = document.getElementById("center_panel").innerHTML;
            var printWindow = window.open('', "_blank", 'height=700,width=900,top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no');
            printWindow.document.body.innerHTML = printHthml;
            printWindow.print();
            printWindow.close();
        });
        //“取消”按钮事件
        commonUtils.eventBind("goBackBtn", "click", function () {
            leftMenu.actMenuClick();
        });
        //“病历信息关联查询”按钮事件
        commonUtils.eventBind("accessMedRecInfoBtn", "click", function () {
            openNewWind($("#ID_NUM").val());
        });
    }

    /**
     * 页面初始化
     * @param option 操作（新增：save，修改：update）
     * */
    function initPage(option) {
        /*
         var fileID = ($("#FILEINDEX").val() == ""?commonUtils.newGuid():$("#FILEINDEX").val());
         $("#FILEINDEX").val(fileID);
         initFileUpload(fileUploadBtn["treatmentFileBtn"],{'scriptData' : {'fileID' : fileID,'FILE_TYPE':1}},option);
         initFileUpload(fileUploadBtn["applicationFileBtn"],{'scriptData' : {'fileID' : fileID,'FILE_TYPE':0}},option);*/
    }

    //暴露接口
    window.W_SYS_API["openTpl"] = {
        open: openTpl
    };

})(jQuery, window, document);