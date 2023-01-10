import { Query } from "./Query";
import { Varaible } from "./Varaible";

export type StateData = {
    title: string,
    variables: Varaible[],
    chartData: {
        dimension?:{
            Tid:{
                category:{
                    label:{

                    }
                }
            }
        },
        value?: string[],
        isLoading: boolean
    }
  };

export type ProvideData = {
    data: StateData,
    getDataByQuery: (query:Query[]) => void
}