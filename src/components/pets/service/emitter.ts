import EventEmitter from "events";
export const emmitersList: any= {
    updateDataBase:"updateDataBase"
}
interface MyEvents {
    customEvent: (data: { message: string }) => void;
  }
  
  class TypedEventEmitter extends EventEmitter {
    on<K extends keyof MyEvents>(event: K, listener: MyEvents[K]): this {
      return super.on(event, listener);
    }
  
    emit<K extends keyof MyEvents>(event: K, ...args: Parameters<MyEvents[K]>): boolean {
      return super.emit(event, ...args);
    }
  }
  
  // Create an instance of the typed event emitter
  const eventEmitter = new TypedEventEmitter();
  
  
  export default eventEmitter;
  