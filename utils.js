//判断UA
export const JudgeUA = function () {
    const ua = navigator.userAgent.toLowerCase();
    if (ua != null && ua.includes('micromessenger')) return 'wechat';
    if (ua != null && ua.includes('alipay')) return 'alipay';
    if (ua != null && ua.includes('jdapp')) return 'jdapp';
    if (ua != null && ua.includes('jdjr')) return 'jdjr';
    if (ua != null && ua.includes('mpbank')) return 'cmb';
    if (ua != null && ua.includes('unionpay')) return 'union';
  
    return "other";
  }
  