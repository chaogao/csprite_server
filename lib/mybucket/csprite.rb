require 'aliyun/oss'

include Aliyun::OSS

#连接信息
Aliyun::OSS::Base.establish_connection!(
  :access_key_id     => 'XAN8ouVgujW4Kih7', 
  :secret_access_key => 'OjiHGCIiKuRjSMxTeCtCuT8d3VrLZT'
)

class CspriteBucket < Aliyun::OSS::OSSObject
  set_current_bucket_to 'csprite'
end