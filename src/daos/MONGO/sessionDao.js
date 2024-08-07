import { sessionModel } from '../../models/sessions.models.js';

export default class SessionDao {
    constructor() {
        this.sessionModel =  sessionModel;
    }

    createSession = async (token) => {
        return await this.sessionModel.create(token);
    };

    getEmailToToken = async (token) => {
        return await this.sessionModel.find(token);
    }
}