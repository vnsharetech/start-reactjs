import * as Yup from "yup";

function equalTo(ref, msg) {
  return Yup.mixed().test({
    name: "equalTo",
    exclusive: false,
    // eslint-disable-next-line
    message: msg || "${path} must be the same as ${reference}",
    params: {
      reference: ref.path,
    },
    test: function (value: any) {
      return value === this.resolve(ref);
    },
  });
}

function getErrors(error) {
  const errors = error.inner.reduce((formError, innerError) => {
    return Object.assign({}, formError, {
      [innerError.path]: innerError.message,
    });
  }, {});
  return errors;
}

export { equalTo, getErrors };
