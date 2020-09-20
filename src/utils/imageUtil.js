const { Storage } = require("aws-amplify");

export const getImageUrl = async (imageKey, identityId) => {
  try {
    return await Storage.get(imageKey, {
      level: "protected",
      identityId: identityId,
    });
  } catch (e) {
    // TODO: 에러 처리
    console.error(e);
  }
};
