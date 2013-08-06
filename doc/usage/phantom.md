# Install and configure PhantomJS

## Install

If you want to make use of PhantomJS headless testing, you'll additionally need to [install PhantomJS](http://phantomjs.org/download.html) and make sure it's in your `PATH`.

### Installing PhantomJS on Windows

1. Download `phantomjs-x.y.z-windows.zip` and extract it.
2. Move the contents of `phantomjs-x.y.z-windows` to `C:\bin\phantomjs`
3. Add `C:\bin\phantomjs` to `PATH`
4. Check that it works by issuing `phantomjs --version` in cmd

### Installing PhantomJS on Ubuntu

Quick setup on 64bit Ubuntu:

````
cd /usr/local/share/
sudo wget http://phantomjs.googlecode.com/files/phantomjs-x.y.z-linux-x86_64.tar.bz2
sudo tar jxvf phantomjs-x.y.z-linux-x86_64.tar.bz2
sudo ln -s /usr/local/share/phantomjs-x.y.z-linux-x86_64/ /usr/local/share/phantomjs
sudo ln -s /usr/local/share/phantomjs/bin/phantomjs /usr/local/bin/phantomjs
````

If you have 32bit version, replace `x86_64` with `i686` in the commands above.

Check that it works by issuing `phantomjs --version` in console.
