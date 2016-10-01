class ClassroomsController < ApplicationController
	def index
		@classrooms=Classroom.all
		respond_to do |format|

 			# format.html 
 			format.json { render :json => @classrooms, :status => :ok }
		end
	end
	def show
		begin
		@classroom = Classroom.find(params[:id])
		respond_to do |format|

 			# format.html 
 			format.json { render :json => @classroom, :status => :ok }
 			# format.json { render :json => @classroom.to_json("school_details"=>[@classroom.school]), :status => :ok }
		end
		rescue => e
			p e.message
			respond_to do |format|

 				# format.html 
 				format.json {render :json =>  { "error" => e.message}, :status  => :unprocessable_entity}
 			end
		end
	end
	def new
		@classroom= Classroom.new()
		respond_to do |format|

 			# format.html 
 			format.json { render :json => @classroom, :status => :ok }
		end
	end
	 def edit 
	 	@classroom = Classroom.find(params[:id])
	 	respond_to do |format|

 			# format.html 
 			format.json { render :json => @classroom, :status => :ok }
		end
	 end
	def create
# //Teacher.new(params.require(:teacher).permit(:name,  :gender, :phone_no, 
# :school_id).merge(:classroom_ids=>params[:teacher][:classroom_ids],:subject_ids=>params[:teacher][:subject_ids]))
		 @classroom = Classroom.new(params.require(:classroom).permit(:name, :number_of_students, :school_id).merge(:subject_ids=>params[:classroom][:subject_ids]))
		 if @classroom.save
		 	
		 	respond_to do |format|
 				# format.html {render 'show'}
 				format.json {render json: @classroom, :status => :ok}
 			end
    	 else
    	 	respond_to do |format|
 				# format.html {render 'new'}
 				format.json {render :json => @classroom.errors, :status  => :unprocessable_entity}
 			end
      	end
	end
	def update
		begin
		@classroom = Classroom.find(params[:id])
		if @classroom.update_attributes(params.require(:classroom).permit(:name, 
			:number_of_students, :school_id).merge(:subject_ids=>params[:classroom][:subject_ids]))

			respond_to do |format|

 				# format.html {render 'show'}
 				format.json {render json: @classroom, :status => :ok}
 			end
		else
			respond_to do |format|

 				# format.html {render 'new'}
 				format.json {render :json => @classroom.errors, :status  => :unprocessable_entity}
 			end
		end
	    rescue => e
	    	p e.message
			respond_to do |format|

 				# format.html {render 'new'}
 				format.json {render :json => {"error" => e.message}, :status  => :unprocessable_entity}
 			end
		end
	end
	def destroy
		begin
		@classroom = Classroom.find(params[:id])
	   if @classroom.destroy
	   	@classrooms = Classroom.all
	      respond_to do |format|

 				# format.html {render 'index'}
 				format.json {render json: @classroom, :status => :ok}
 			end
	   end
	   rescue => e
	   	  p e.message
       	  respond_to do |format|

 				# format.html {render 'index'}
 				format.json {render :json => {"error" => e.message}, :status  => :unprocessable_entity}
 			end
       end
	end
	# private 
	# def classroom_param
	# 	 params.require(:classroom).permit(:name, :number_of_students, :school_id)
	# end	
	def filtered_index
    # refactor this to generate dynamic query
    begin

      @classrooms = Classroom.where(:school_id => params[:school_id])
       # respond_to do |format|
       	# format.json {render json: @classroom, :status => :ok}
 			# format.html 
 			   # format.json { render :json => @classroom.to_json("classroom_details"=>[@classroom],"subject_details"=>[@subject_details]), :status => :ok }
 			   render :json => @classrooms.to_json(:methods => [:classroom, :subject_details, :school_details]), :status => :ok
		# end
		rescue => e
			p e.message
			respond_to do |format|

 				# format.html 
 				format.json {render :json =>  { "error" => e.message}, :status  => :unprocessable_entity}
 			end
	  end
  end
end
