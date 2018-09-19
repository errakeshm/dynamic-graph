export class CommonUtil{
    public static isEmpty(pObj:any):boolean{
        let result:boolean = false;
        if(pObj==null || typeof pObj =='undefined'){
            result = true;
        }
        return result;
    }
}