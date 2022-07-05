name: moneytolia-admin
Version: 0.1
Release: 2.5
Summary: MONEYTOLIA Admin Page

Group: System
License: GPL

Requires: nodejs
BuildRoot: /opt/deployer/temp/admin-web/moneytolia/rpmbuild/

%description
Moneytolia Landing Page

%prep
echo "BUILDROOT = $RPM_BUILD_ROOT"
mkdir -p /home/deployer/rpmbuild/RPMS/noarch/old
if [ "$(ls /home/deployer/rpmbuild/RPMS/noarch/*admin*.rpm 2>/dev/null)" ];then
mv /home/deployer/rpmbuild/RPMS/noarch/*admin*.rpm /home/deployer/rpmbuild/RPMS/noarch/old
fi
mkdir -p $RPM_BUILD_ROOT/opt/moneytolia/
mkdir -p $RPM_BUILD_ROOT/etc/systemd/system
cp -r /opt/deployer/temp/admin-web/admin-web $RPM_BUILD_ROOT/opt/moneytolia/admin
mv $RPM_BUILD_ROOT/opt/moneytolia/admin/.env $RPM_BUILD_ROOT/opt/moneytolia/admin/.env.example
rm $RPM_BUILD_ROOT/opt/moneytolia/admin/rpmbuild.spec
cd $RPM_BUILD_ROOT/opt/moneytolia/admin
mv moneytolia-admin.service $RPM_BUILD_ROOT/etc/systemd/system

exit

%pre

%post
systemctl daemon-reload
systemctl status moneytolia-admin.service 2>&1 >/devnull
if [ $? -eq 0 ]
then
  echo Restarting moneytolia-admin service.
  systemctl restart moneytolia-admin.service
fi

%clean
rm -rf $RPM_BUILD_ROOT/opt

%files
%attr(-, moneytolia-admin, moneytolia-admin) /opt/moneytolia/admin
%attr(0744, moneytolia-admin, moneytolia-admin) /opt/moneytolia/admin/run.sh
%attr(0600, root, root) /etc/systemd/system/moneytolia-admin.service

%changelog