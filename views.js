"use strict";
{
  const {def,T,I} = require('dosyhil');

  const build = def`build ${0}
    <meta charset="UTF-8">
    <meta name=viewport content="width=device-width, initial-scale=1, user-scalable=no">
    <link rel=stylesheet href=all.css>
    <link rel=stylesheet href=custom.css>
    <h1>Main Build</h1>
    <nav class=tabs>
      <ul class="horizontal tabs">
        <li>
          <input id=bt1 type=radio name=btabs value=t1 checked> 
          <label for=bt1>Build Maps</label>
          <article class=tab>
            <form method=GET action=#build>
              <fieldset>
                <legend>Build Maps</legend>
                <p>
                  This is where you build for maps
                </p>
                <p>
                  <label for=bbuild_maps>Build</label>
                  <input id=bbuild_maps type=build spellcheck=off>
                  <input type=submit value=Build>
                </p>
              </fieldset>
            </form>
          </article>
        </li>
        <li>
          <input id=bt2 type=radio name=btabs value=t2> 
          <label for=bt2>Build Journeys</label>
          <article class=tab>
            <form method=GET action=#build>
              <fieldset>
                <legend>Build Journeys</legend>
                <p>
                  This is where you build for journeys
                </p>
                <p>
                  <label for=bbuild_journeys>Build</label>
                  <input id=bbuild_journeys type=build spellcheck=off>
                  <input type=submit value=Build>
                </p>
              </fieldset>
            </form>
          </article>
        </li>
      </ul>
    </nav>
  `;

  const search = def`search ${0}
    <meta charset="UTF-8">
    <meta name=viewport content="width=device-width, initial-scale=1, user-scalable=no">
    <link rel=stylesheet href=all.css>
    <link rel=stylesheet href=custom.css>
    <h1>Main Search</h1>
    <nav class=tabs>
      <ul class="horizontal tabs">
        <li>
          <input id=st1 type=radio name=stabs value=t1 checked> 
          <label for=st1>Search Maps</label>
          <article class=tab>
            <form method=GET action=#search>
              <fieldset>
                <legend>Search Maps</legend>
                <p>
                  This is where you search for maps
                </p>
                <p>
                  <label for=ssearch_maps>Search</label>
                  <input id=ssearch_maps type=search spellcheck=off>
                  <input type=submit value=Search>
                </p>
              </fieldset>
            </form>
          </article>
        </li>
        <li>
          <input id=st2 type=radio name=stabs value=t2> 
          <label for=st2>Search Journeys</label>
          <article class=tab>
            <form method=GET action=#search>
              <fieldset>
                <legend>Search Journeys</legend>
                <p>
                  This is where you search for journeys
                </p>
                <p>
                  <label for=ssearch_journeys>Search</label>
                  <input id=ssearch_journeys type=search spellcheck=off>
                  <input type=submit value=Search>
                </p>
              </fieldset>
            </form>
          </article>
        </li>
        <li>
          <input id=st3 type=radio name=stabs value=t3> 
          <label for=st3>Info</label>
          <article class=tab>
            <p class=info>
              We are using Node.js <script>document.write(process.versions.node)</script>,
              Chromium <script>document.write(process.versions.chrome)</script>,
              and Electron <script>document.write(process.versions.electron)</script>.
            </p>
          </article>
        </li>
      </ul>
    </nav>
  `;

  const views = {
    build, search
  };

  module.exports = views;
}
