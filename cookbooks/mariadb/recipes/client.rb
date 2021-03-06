#
# Cookbook Name:: mariadb
# Recipe:: client
#
# Copyright 2014, blablacar.com
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

case node['mariadb']['install']['type']
when 'package'
  include_recipe "#{cookbook_name}::repository"

  case node['platform_family']
  when 'rhel'
    # On CentOS at least, there's a conflict between MariaDB and mysql-libs
    package 'mysql-libs' do
      action :remove
    end

    if node['mariadb']['client']['development_files']
      node.default['mariadb']['client']['packages'] = \
        %w(MariaDB-client MariaDB-devel)
    else
      node.default['mariadb']['client']['packages'] = \
        %w(MariaDB-client)
    end
  when 'fedora'
    if node['mariadb']['client']['development_files']
      node.default['mariadb']['client']['packages'] = \
        %w(mariadb mariadb-devel)
    else
      node.default['mariadb']['client']['packages'] = \
        %w(mariadb)
    end
  when 'suse'
    if node['mariadb']['client']['development_files']
      node.default['mariadb']['client']['packages'] = \
        %w(mariadb-community-server-client libmariadbclient-devel)
    else
      node.default['mariadb']['client']['packages'] = \
        %w(mariadb-community-server-client)
    end
  when 'debian'
    if node['mariadb']['client']['development_files']
      node.default['mariadb']['client']['packages'] = \
        %W(mariadb-client-#{node['mariadb']['install']['version']}
           libmariadbclient-dev)
    else
      node.default['mariadb']['client']['packages'] = \
        %W(mariadb-client-#{node['mariadb']['install']['version']})
    end
  end

  node['mariadb']['client']['packages'].each do |name|
    package name
  end
when 'from_source'
  # To be filled as soon as possible
end
