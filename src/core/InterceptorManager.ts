import { ResovledFn, RejectedFn } from '../types/index';
interface Interceptor<T>{
    resolved: ResovledFn<T>,
    rejected?:RejectedFn
}
export default class InterceptorManager<T> {
    private interceptors:Array<Interceptor<T>|null>
    
    constructor(){
        this.interceptors = []
    }

    use(resolved:ResovledFn<T>,rejected?:RejectedFn):number{
        this.interceptors.push({
            resolved,
            rejected
        })
        return this.interceptors.length - 1 
    }
    forEach(fn:(interceptor:Interceptor<T>)=>void):void{
        this.interceptors.forEach(interceptor=>{
            if(interceptor !== null){
                fn(interceptor)
            }
        })
    }
    eject(id:number):void{
        if(this.interceptors[id]){
            // 不能动原数组长度
            this.interceptors[id] = null
        }
    }
}