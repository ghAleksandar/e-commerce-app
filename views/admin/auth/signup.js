import layout from '../layout.js'
import { getError } from '../../helpers.js';

export default ({ req, errors }) => {
  // @TODO check this how to add dynamic pages for capoHub 385 lesson
  // This goes to auth in routes
  return layout({content: `
      <div>
      Your ID is: ${req.session.userId}
        <form method="POST">
          <input name="email" placeholder="email" />
          ${getError(errors, 'email')}
          <input name="password" placeholder="password" />
          ${getError(errors, 'password')}
          <input name="passwordConfirmation" placeholder="password confirmation" />
          ${getError(errors, 'passwordConfirmation')}
          <button>Sign Up</button>
        </form>
      </div>
    `
  });
}
