import actions from '../../actionNames';

export default {
  blowup(message) {
    return {type: actions.blowup, message};
  },
  uploadStarting() {
    return {type: actions.syncing, inProgress: true};
  },
  uploadFinished() {
    return {type: actions.syncing, inProgress: false};
  }
};