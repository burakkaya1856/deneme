name: paypango-admin
Version: 0.2
Release: 3.0
Summary: MONEYTOLIA Admin Page

Group: System
License: GPL

Requires: nodejs
BuildRoot: /opt/deployer/temp/admin-web/paypango/rpmbuild/

%description
Paypango Landing Page

%prep
echo "BUILDROOT = $RPM_BUILD_ROOT"
mkdir -p /home/deployer/rpmbuild/RPMS/noarch/old
if [ "$(ls /home/deployer/rpmbuild/RPMS/noarch/*admin*.rpm 2>/dev/null)" ];then
mv /home/deployer/rpmbuild/RPMS/noarch/*admin*.rpm /home/deployer/rpmbuild/RPMS/noarch/old
fi
mkdir -p $RPM_BUILD_ROOT/opt/paypango/
mkdir -p $RPM_BUILD_ROOT/etc/systemd/system
cp -r /opt/deployer/temp/admin-web $RPM_BUILD_ROOT/opt/paypango/
mv $RPM_BUILD_ROOT/opt/paypango/admin-web/.env $RPM_BUILD_ROOT/opt/paypango/admin-web/.env.example
rm $RPM_BUILD_ROOT/opt/paypango/admin-web/rpmbuild.spec
cd $RPM_BUILD_ROOT/opt/paypango/admin-web
mv paypango-admin.service $RPM_BUILD_ROOT/etc/systemd/system

exit

%pre

%post
systemctl daemon-reload
systemctl status paypango-admin.service 2>&1 >/devnull
if [ $? -eq 0 ]
then
  echo Restarting paypango-admin service.
  systemctl restart paypango-admin.service
fi

%clean
rm -rf $RPM_BUILD_ROOT/opt

%files
%attr(-, paypango-admin, paypango-admin) /opt/paypango/admin-web
%attr(0744, paypango-admin, paypango-admin) /opt/paypango/admin-web/run.sh
%attr(0600, root, root) /etc/systemd/system/paypango-admin.service

%changelog
