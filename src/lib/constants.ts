// 영어 소문자, 대문자, 숫자, ~#?!@$%^&*_- 이 특수문자 중 하나의 특수문자를 반드시 포함
export const PASSWORD_REGEX = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[~#?!@$%^&*_-]).+$/);
export const PASSWORD_MIN_LENGTH = 10;
export const USERNAME_MIN_LENGTH = 5;

export const TWEET_PAGE = 2;