require 'digest/sha1'

class User < ActiveRecord::Base
  attr_accessible :uemail, :uname, :passwd, :passwd_confirmation

  validates_uniqueness_of [:uemail]
  validates_presence_of [:uname, :uemail, :upasswd]
  validates_confirmation_of :passwd
  validates_length_of :uname, :in => 2..10
  validates_format_of :uemail, :with => /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/, :message => 'Invalid Email'

  HASHEDKEY = 'csprite'
  IDOFFSET = 100000

  def self.check_password(uemail, passwd)
  	user = User.find_by_uemail(uemail)
  	if (user && user.upasswd == User.generate_hashed_passwd(passwd, user.salt))
  		return user
  	end
  end

  def self.generate_hashed_passwd (passwd, salt)
  	string_to_hash = passwd + HASHEDKEY + salt
  	Digest::SHA1.hexdigest(string_to_hash)
  end

  def passwd= (passwd)
  	@passwd = passwd
  	self.salt = self.generate_salt
  	self.upasswd = User.generate_hashed_passwd(passwd, self.salt)
  end

  def passwd
  	@passwd
  end

  def generate_salt
  	return self.object_id.to_s + rand.to_s
  end
end