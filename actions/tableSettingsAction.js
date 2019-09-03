import * as types from '../constants/actionTypes';

export function addNewUser(user) {
  return { type: types.ADD_NEW_USER, user };
}

export function deleteUser(userId) {
  return { type: types.DELETE_USER, userId };
}

export function updateUser(users) {
  return { type: types.UPDATE_USER, users };
}