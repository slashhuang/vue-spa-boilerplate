/* 
 * @Author: zhuxinyong
 * @Date:   16/5/31
 * @Email:  zhuxinyong.sh@superjia.com
 * @Last Modified by:   zhuxinyong
 * @Last Modified time: 16/5/31
 */

export default {
    getUrl(key){
        let root = '';
        // root = 'http://fe.iwjw.com:8080/s/api/debug/1ed38e';
        return root + '/licai/' + {
                fund: 'reserveFundInfo.action',
                list: 'paidRecordList.action'
            }[key];
    }
}