export function getError (errors, prop) {
  try {
    return errors.mapped()[prop].msg
  } catch (err) { return ''; }
}
