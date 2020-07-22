import Client from '../client';
import Constants from '../constants';

export const openSurveyModal = (postID, meetingID, surveyID, surveyVersion) => (
    dispatch,
) => {
    dispatch({
        type: Constants.ACTION_TYPES.OPEN_SURVEY_MODAL,
        postID,
        meetingID,
        surveyID,
        surveyVersion,
    });
};

export const closeSurveyModal = () => (dispatch) => {
    dispatch({
        type: Constants.ACTION_TYPES.CLOSE_SURVEY_MODAL,
    });
};

export function surveySubmitSuccess() {
    return {
        type: Constants.ACTION_TYPES.SURVEY_SUBMIT_SUCCESS,
    };
}

export function getSurvey(surveyID, surveyVersion) {
    return async () => {
        let data;
        try {
            data = await Client.getSurvey(surveyID, surveyVersion);
        } catch (error) {
            return {
                data: null,
                error,
            };
        }

        return {
            data,
            error: null,
        };
    };
}

export function submitSurveyResponses(
    surveyPostID,
    meetingID,
    surveyID,
    surveyVersion,
    responses,
) {
    return async (dispatch) => {
        let data;
        try {
            data = await Client.submitSurveyResponses(
                surveyPostID,
                meetingID,
                surveyID,
                surveyVersion,
                responses,
            );
        } catch (error) {
            return {
                data: null,
                error,
            };
        }

        dispatch(surveySubmitSuccess());
        return {
            data,
            error: null,
        };
    };
}
