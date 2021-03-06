/* globals $ */
import BaseModel from "./BaseModel.js";

class VariablesModel extends BaseModel {
    static reduce(state = {}, action) {
        var new_state;
        switch (action.type) {
            case "LOAD_VARIABLES":
                var new_list = Object.assign({}, state);
                action.var_list.forEach(var_obj => {
                    let key = Object.keys(var_obj)[0];
                    new_list[key] = var_obj[key];
                });
                return new_list;
            case "REMOVE_VARIABLE": // Removes variable from list of loaded variables (left side bar)
                new_state = $.extend(true, {}, state);
                delete new_state[action.name];
                return new_state;
            case "UPDATE_VARIABLE":
                new_state = $.extend(true, {}, state);
                var axis_list = $.extend(true, [], action.axis_list);
                var new_dimensions = $.extend(true, [], action.dimensions);
                var new_transforms = $.extend(true, {}, action.transforms);
                new_state[action.name].axisList = axis_list;
                new_state[action.name].dimension = new_dimensions;
                new_state[action.name].transforms = new_transforms;
                return new_state;
            default:
                return state;
        }
    }
}

export default VariablesModel;
