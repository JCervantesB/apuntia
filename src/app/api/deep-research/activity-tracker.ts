import { Activity, ResearchState } from './types';

// Interfaz para el stream de datos
interface DataStream {
  writeData(data: {
    type: string;
    content: {
      type: Activity['type'];
      status: Activity['status'];
      message: Activity['message'];
      timestamp: number;
      completedSteps: number;
      tokenUsed: number;
    };
  }): void;
}

export const createActivityTracker = (dataStream: DataStream, researchState: ResearchState) => {

    return {
        add: (type: Activity['type'], status: Activity['status'], message: Activity['message'] ) => {
            dataStream.writeData({
                type: "activity",
                content:{
                    type,
                    status,
                    message,
                    timestamp: Date.now(),
                    completedSteps: researchState.completedSteps,
                    tokenUsed: researchState.tokenUsed
                }
            })
        }
    }
}