config.headers.set('X-CSRF-Token', data.csrfToken)
```[cite: 12]

The client test failed with `Received: undefined` because of a property name mismatch. Most server-side CSRF libraries (like `double-csrf`) return the token property as **`token`**, not `csrfToken`. 

### How to Fix It:

**Option 1: Change `csrfToken` to `token` in `client/src/api.js` (Recommended if using standard packages)**
Update line 19 to match what your server endpoint actually returns:
```javascript
config.headers.set('X-CSRF-Token', data.token)
```[cite: 12]

**Option 2: Check your Server Route**
If your server's `/csrf-token` route is explicitly sending `{ csrfToken: ... }`, make sure it matches. But if it's sending `{ token: ... }`, Option 1 will immediately fix the `undefined` header error.

---
*Don't forget:* You also need to fix the server-side export error (`doubleCsrfProtection`) in your `server/middleware/csrf.js` file so that the server starts successfully during tests.
