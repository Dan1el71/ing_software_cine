import pgPromise from "pg-promise";
import { camelizeColums, IClient } from "./camelCase";

export const optionsPG: pgPromise.IInitOptions<IClient> = {
  receive(e) {
    camelizeColums(e.data);
  },
};
