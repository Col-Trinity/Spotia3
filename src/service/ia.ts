import BaseService from "./base";

const BASE_ROUTE = '/api/ia';

class IAService extends BaseService {
    static #instance: IAService;

    public static get instance(): IAService {
        if (!IAService.#instance) {
            IAService.#instance = new IAService();
        }

        return IAService.#instance;
    }

    private constructor() {
        super(BASE_ROUTE);
    }    
}

export default IAService;