class SchoolsController < ApplicationController
	def index
		p "index"
		@schools=School.all
		respond_to do |format|
 			# format.html 
			format.json {render :json => @schools, :status => :ok}
		end
	end
	def show
		begin
		@school = School.find(params[:id])
		respond_to do |format|
 			# format.html 
			format.json {render :json => @school, :status => :ok}
		end
		rescue => e
      		p e.message
      		respond_to do |format|
 				# format.html 
				format.json {render :json => { "error" => e.message} , :status  => :unprocessable_entity}
			end
		end
	end
	def create
		p "jhggjghjgjhgj"
		p "hererre"
		p "school_param"
		@school = School.new(school_param)
		
		if @school.save
			respond_to do |format|
 				# format.html {render 'show'}
				format.json {render :json => @school, :status => :ok}
			end
		else
			# render 'new', status: :unprocessable_entity
			respond_to do |format|
				p "Starting"
 				# format.html {render 'new'}
 				p @school.errors
				format.json {render :json => @school.errors , :status  => :unprocessable_entity}
			end
		end
	end
	def update
		begin
			@school = School.find(params[:id])
			if @school.update_attributes(school_param)
				
				respond_to do |format|

 					# format.html {render 'show'}
					format.json {render :json => @school, :status => :ok}
				end
			else
				respond_to do |format|
					p @school.errors
 				# format.html  {render 'edit'}
				format.json {render :json => @school.message , :status  => :unprocessable_entity}
			end
			end
			rescue => e
			respond_to do |format|

 				# format.html {render 'edit'}
				format.json {render :json => { "error" => e.message} , :status  => :unprocessable_entity}
			end
		end
	end
	def destroy
		begin
		@school = School.find(params[:id])
			if @school.destroy
	   		@schools = School.all
	    	respond_to do |format|
	    		# format.html {render 'index'}
	    		format.json {render :json => @school, :status => :ok}
	     	end
	   		end
	   		rescue => e
       	  	respond_to do |format|
       	   	@schools = School.all
 					# format.html {render 'index'}
					format.json {render :json => { "error" => e.message} , :status  => :unprocessable_entity}
			end
     	end
	end
	private 
	def school_param
		 params.require(:school).permit(:name, :address, :city, :zipcode, :state, :phone_no)
	end	
	
end
