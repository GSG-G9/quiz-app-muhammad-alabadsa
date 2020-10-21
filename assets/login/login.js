const loginSection = `
    <div class="login--container" id="login">
        <div class="close">x</div>
        <div class="login--title">
            <h2>Login</h2>
        </div>
        <div class="login--form">
            <form id="form">
                <div class="form--group">
                    <label class="form--control" for="name-input">Name:</label>
                    <input type="text" name="name" id="name-input" focus/>
                </div>
                <div class="form--group">
                    <label class="form--control" for="password-input">Password:</label>
                    <input type="password" name="password" id="password-input"/>
                </div>
                <div class="form--group">
                    <button type="submit" id="submit-btn">Login</button>
                </div>
            </form>
        </div>
    </div>
`;

export default loginSection;